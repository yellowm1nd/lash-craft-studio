import { useState, useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadAPI } from '@/lib/supabase-api';
import { canUploadToFolder, LIMITS, formatBytes } from '@/lib/storage-limits';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
  currentImage?: string;
  onRemove?: () => void;
  label?: string;
  aspectRatio?: string;
}

export const ImageUpload = ({
  onUploadComplete,
  folder = 'general',
  currentImage,
  onRemove,
  label = 'Bild hochladen',
  aspectRatio = 'aspect-video',
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Bitte nur Bilddateien hochladen');
        return;
      }

      if (file.size > LIMITS.MAX_FILE_SIZE_BYTES) {
        toast.error(`Bild ist zu groß (max. ${LIMITS.MAX_FILE_SIZE_MB}MB)`);
        return;
      }

      setUploading(true);
      try {
        // Check if upload is allowed for this folder
        const folderName = folder as 'gallery' | 'services' | 'testimonials';
        const uploadCheck = await canUploadToFolder(folderName || 'gallery');

        if (!uploadCheck.allowed) {
          toast.error(uploadCheck.reason || 'Upload nicht möglich');
          setUploading(false);
          return;
        }

        // Compress image before upload
        const originalSize = formatBytes(file.size);
        console.log(`Original image size: ${originalSize}`);

        const options = {
          maxSizeMB: 0.5, // Compress to max 500KB
          maxWidthOrHeight: 1920, // Max 1920px width/height
          useWebWorker: true,
          fileType: 'image/jpeg', // Convert to JPEG for better compression
        };

        const compressedFile = await imageCompression(file, options);
        const compressedSize = formatBytes(compressedFile.size);
        console.log(`Compressed image size: ${compressedSize}`);

        // Show compression info
        if (compressedFile.size < file.size) {
          toast.info(`Bild komprimiert: ${originalSize} → ${compressedSize}`);
        }

        const url = await uploadAPI.uploadImage(compressedFile, folder);
        onUploadComplete(url);
        toast.success('Bild erfolgreich hochgeladen!');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Fehler beim Hochladen');
      } finally {
        setUploading(false);
      }
    },
    [folder, onUploadComplete]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium">{label}</label>}

      {currentImage ? (
        <div className="relative group">
          <div className={`${aspectRatio} rounded-lg overflow-hidden border-2 border-gray-200`}>
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-full object-cover"
            />
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`${aspectRatio} rounded-lg border-2 border-dashed transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <label className="flex flex-col items-center justify-center h-full cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
              disabled={uploading}
            />
            {uploading ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                <p className="text-sm text-gray-600">Wird hochgeladen...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Klicken oder Bild hierher ziehen
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP (max. 5MB)</p>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
};
