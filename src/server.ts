import { serverHttp } from "./http";
import "./websocket";

// server
serverHttp.listen(3000, () => console.log("Server is running on PORT 3000"));