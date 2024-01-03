import {TopBarContainerComponent} from "./TopBarContainerComponent";
import {TrombinoscopeContainerComponent} from "./TrombinoscopeContainerComponent";

export function AppContainerComponent(){
    return (
        <div id="app-container">
            <h1 id="vertical-title">trombinoscope</h1>
            <div id="app-content">
                <TopBarContainerComponent/>
                <TrombinoscopeContainerComponent/>
            </div>
        </div>
    )
}