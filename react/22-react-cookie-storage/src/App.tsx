import CookieComponent from "./components/CookieComponent";
import {CookiesProvider} from "react-cookie"; //추가
function App() {
  return (
      <CookiesProvider>
          <CookieComponent />
      </CookiesProvider>
  );
}

export default App;