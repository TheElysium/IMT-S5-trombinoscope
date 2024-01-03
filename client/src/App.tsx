import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppContainerComponent} from "./components/AppContainerComponent";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContainerComponent/>
        </QueryClientProvider>
    )
}

export default App
