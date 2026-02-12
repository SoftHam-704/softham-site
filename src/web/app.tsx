import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Tutoriais from "./pages/tutoriais";
import Contato from "./pages/contato";
import SalesMaster from "./pages/salesmaster";
import EmissorFiscal from "./pages/emissor-fiscal";
import SalesSpot from "./pages/salesspot";
import StrudentApp from "./pages/strudent-app";
import Analytics from "./pages/analytics";
import { Provider } from "./components/provider";

function App() {
        return (
                <Provider>
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/tutoriais" component={Tutoriais} />
                                <Route path="/contato" component={Contato} />
                                <Route path="/salesmaster" component={SalesMaster} />
                                <Route path="/emissor-fiscal" component={EmissorFiscal} />
                                <Route path="/salesspot" component={SalesSpot} />
                                <Route path="/strudent-app" component={StrudentApp} />
                                <Route path="/analytics" component={Analytics} />
                        </Switch>
                </Provider>
        );
}

export default App;
