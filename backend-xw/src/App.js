import './App.css'
import IndexRouter from "./router/IndexRouter";
import {


  QueryClient,

  QueryClientProvider,

} from 'react-query'
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
 <IndexRouter/>
 </QueryClientProvider>
  );
}

export default App;
