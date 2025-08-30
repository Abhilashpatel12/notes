import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[80vh] flex flex-col p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Note</h2>
        <input
          type="text"
          placeholder="Your note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-hidden">
          <textarea
            placeholder="Write your note in Markdown here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-4 border border-gray-300 rounded-md resize-none font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="prose prose-blue w-full h-full p-4 border border-gray-200 rounded-md overflow-y-auto bg-gray-50">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save Note</button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
