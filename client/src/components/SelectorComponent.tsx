import {SelectorOption} from "../types.ts";

export function SelectorComponent({selected, options, setSelected}: {
    selected: string,
    options: SelectorOption[],
    setSelected: (option: string) => void
}) {
    console.log(options)
    const renderSelectors = () => {
        return (
            <div className="selector">
                <h2 className="selector-selected">{options.find(o => o.id === selected)?.value}</h2>
                {options
                    .filter((option: SelectorOption) => option.id !== selected)
                    .map((option: SelectorOption) => (
                        <h2 key={option.id} onClick={() => {setSelected(option.id);
                            console.log(option.id)}}>
                            {option.value}
                        </h2>
                    ))}
            </div>
        );
    };

    return renderSelectors();
}
