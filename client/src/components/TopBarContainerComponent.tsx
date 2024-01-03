import {SelectorComponent} from "./SelectorComponent";
import {SearchComponent} from "./SearchComponent";

export function TopBarContainerComponent(){
    return (
        <div id="top-bar">
            <SelectorComponent/>
            <SelectorComponent/>
            <SearchComponent/>
        </div>
        )
}