import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
  onCancel: () => void;
  initialTitle?: string;
  initialContent?: string;
}

const NoteEditor = ({ onSave, onCancel, initialTitle = '', initialContent = '' }: NoteEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialTitle ? 'Edit Note' : 'Create a New Note'}
          </h2>
          <div className="text-sm text-gray-500">
            Markdown supported
          </div>
        </div>
        
        <input
          type="text"
          placeholder="Your note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow overflow-hidden">
          {/* Editor Pane */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Write</h3>
              <div className="text-xs text-gray-400">
                Supports: **bold**, *italic*, `code`, lists, links, etc.
              </div>
            </div>
            <textarea
              placeholder="Write your note in Markdown here...

Examples:
# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

```javascript
const hello = 'world';
```

[Link text](https://example.com)

> Blockquote text

| Table | Header |
|-------|--------|
| Cell  | Cell   |"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          
          {/* Preview Pane */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Preview</h3>
              <div className="text-xs text-gray-400">
                Live markdown preview
              </div>
            </div>
            <div className="prose prose-sm max-w-none w-full h-full p-4 border border-gray-200 rounded-lg overflow-y-auto bg-gray-50 prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:text-pink-600 prose-code:bg-gray-100 prose-pre:bg-gray-800 prose-blockquote:border-blue-500">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !className;
                    
                    return !isInline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content || '*Start writing to see preview...*'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            💡 Tip: Use Markdown syntax for rich formatting
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onCancel} 
              className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={!title.trim()}
            >
              {initialTitle ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
