import Padlock from "../models/Padlock.js";
import Path from "../models/Path.js";
import PadlockServices from "../services/PadlockServices.js";
import PathServices from "../services/PathServices.js";

PadlockServices.initializePadlocks([new Padlock("12",2),new Padlock("567",3),new Padlock("4002",4)]);
//PathServices.initializePaths();