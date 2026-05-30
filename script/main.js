import Padlock from "../models/Padlock.js";
import Path from "../models/Path.js";
import PadlockServices from "../services/PadlockServices.js";
import PathServices from "../services/PathServices.js";

PadlockServices.initializePadlocks([new Padlock("1234"),new Padlock("5678"),new Padlock("4002")]);
//PathServices.initializePaths();