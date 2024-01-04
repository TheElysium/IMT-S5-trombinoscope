export function SelectorComponent({ selected, options, setSelected }) {
    const renderSelectors = () => {
        return (
            <div className="selector">
                <h2 className="selector-selected">{selected}</h2>
                {options
                    .filter((option) => option !== selected)
                    .map((option) => (
                        <h2 key={option} onClick={() => setSelected(option)}>
                            {option}
                        </h2>
                    ))}
            </div>
        );
    };

    return renderSelectors();
}
