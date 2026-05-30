export default class PathServices {
    static initializePaths(){
        let path = document.createElement("div");
        path.classList.add("path");

        const steps = 10;

        for(let i = 0; i < steps; i++){
            let step = document.createElement("div");
            step.classList.add("step");
            path.appendChild(step);
        }

        document.querySelector("body").appendChild(path);
    }
}