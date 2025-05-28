export default function ProfileHighlights() {
    const highlights = [
      { id: 1, title: 'Viagens' },
      { id: 2, title: 'Comida' },
      { id: 3, title: 'Trabalho' },
      { id: 4, title: 'Família' },
      { id: 5, title: 'Amigos' }
    ];
    
    return (
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full bg-base-200 ring-2 ring-base-300">
                  <div className="text-2xl flex items-center justify-center h-full text-gray-400">
                    {highlight.title.charAt(0)}
                  </div>
                </div>
              </div>
              <span className="text-xs mt-1">{highlight.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }