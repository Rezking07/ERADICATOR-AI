
import React from 'react';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    // A very simple markdown to HTML converter
    const renderContent = () => {
        const lines = content.split('\n');
        const elements = [];
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Bold text: **text**
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Bullet points: * text or - text
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                if (!inList) {
                    elements.push(<ul key={`ul-${i}`} className="list-disc pl-5 space-y-1"></ul>);
                    inList = true;
                }
                const listContent = line.trim().substring(2);
                const lastElement = elements[elements.length - 1];
                if (lastElement && lastElement.type === 'ul') {
                    const newLi = <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: listContent }} />;
                    // This is a simplified way; React warns against direct manipulation of children.
                    // A better approach would be to build the children array and then create the ul element.
                    // For this simple case, we'll rebuild the ul with the new child.
                    const existingChildren = lastElement.props.children || [];
                    elements[elements.length - 1] = React.cloneElement(lastElement, {}, [...React.Children.toArray(existingChildren), newLi]);
                }
            } else {
                inList = false;
                if (line.trim() === '') {
                    // This could be a paragraph break, but for simplicity we'll just let it be.
                    // In a more complex renderer, you'd close the previous paragraph.
                }
                elements.push(<p key={`p-${i}`} className="my-1" dangerouslySetInnerHTML={{ __html: line }} />);
            }
        }
        return elements;
    };

    return <div>{renderContent()}</div>;
};

export default MarkdownRenderer;