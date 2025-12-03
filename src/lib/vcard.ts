export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

/**
 * Generates a vCard (VCF) file content from contact data
 * @param data Contact information to include in vCard
 * @returns vCard formatted string
 */
export const generateVCard = (data: VCardData): string => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.firstName} ${data.lastName}`,
    `N:${data.lastName};${data.firstName};;;`,
    `ORG:${data.organization}`,
    `TEL;TYPE=CELL:${data.phone}`,
    `EMAIL:${data.email}`,
    `ADR;TYPE=WORK:;;${data.address.street};${data.address.city};;${data.address.postalCode};${data.address.country}`,
  ];

  if (data.website) {
    vcard.push(`URL:${data.website}`);
  }

  // Add social media as notes or URLs
  if (data.instagram) {
    vcard.push(`X-SOCIALPROFILE;TYPE=instagram:${data.instagram}`);
  }
  if (data.facebook) {
    vcard.push(`X-SOCIALPROFILE;TYPE=facebook:${data.facebook}`);
  }
  if (data.tiktok) {
    vcard.push(`X-SOCIALPROFILE;TYPE=tiktok:${data.tiktok}`);
  }

  vcard.push('END:VCARD');

  return vcard.join('\n');
};

/**
 * Downloads a vCard file
 * @param data Contact information to include in vCard
 * @param filename Desired filename (without .vcf extension)
 */
export const downloadVCard = (data: VCardData, filename: string = 'contact'): void => {
  const vcardContent = generateVCard(data);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${filename}.vcf`;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
