import "./App.css";
import IndexRouter from "./router/IndexRouter";
import store from "./store";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <IndexRouter />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
