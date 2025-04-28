import Navbar from "../components/NavBar";
import SelectedFeature from "../components/SelectedFeature"
function ChatBotPage() {
    return (
        <div>
            <Navbar selected="Debug"></Navbar>
            <SelectedFeature featureName="Debug"></SelectedFeature>
        </div>
    )
}

export default ChatBotPage;