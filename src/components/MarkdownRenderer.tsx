import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
              {children}
            </p>
          ),
          // Headings
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
              {children}
            </h3>
          ),
          // Strong (bold)
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          // Emphasis (italic)
          em: ({ children }) => (
            <em className="italic">
              {children}
            </em>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground">
              {children}
            </li>
          ),
          // Links
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        } as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
