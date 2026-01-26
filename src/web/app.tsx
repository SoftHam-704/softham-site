import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Sistemas from "./pages/sistemas";
import Tutoriais from "./pages/tutoriais";
import Contato from "./pages/contato";
import { Provider } from "./components/provider";

function App() {
	return (
		<Provider>
			<Switch>
				<Route path="/" component={Index} />
				<Route path="/sistemas" component={Sistemas} />
				<Route path="/tutoriais" component={Tutoriais} />
				<Route path="/contato" component={Contato} />
			</Switch>
		</Provider>
	);
}

export default App;
