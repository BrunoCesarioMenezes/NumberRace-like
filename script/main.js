import Padlock from "../classes/Padlock.js";

initializePadlocks();

async function initializePadlocks() {
    const getPadlockStructure = async () => {
        const response = await fetch("../components/padlock.html");
        const templateHTML = await response.text();

        // Transforma o texto do HTML em uma função interpretadora de crases compilada na hora
        return new Function("index", `return \`${templateHTML}\`;`);
    }

    let padlockTemplate = await getPadlockStructure();

    let padlocks = [
        new Padlock("1234"),
        new Padlock("5678"),
        new Padlock("4002"),
    ];

    padlocks.forEach((padlock, index) => {
        let padlockContainer = document.getElementById("padlock-container");
        let div = document.createElement("div");
        div.classList.add("padlock-wrapper");

        if (!padlock.isLocked()) {
            div.classList.add("unlocked");
        }

        // 1. CORREÇÃO: Executa a função do template uma única vez e insere na div
        div.innerHTML = padlockTemplate(index);
        padlockContainer.appendChild(div);

        applyPadlockEvents(div, padlock, index);
    });
}

function applyPadlockEvents(div, padlock, index) {
     // 2. CORREÇÃO: Busca os elementos por classes de forma relativa (dentro da div atual)
    const inputs = div.querySelectorAll(".digit-input");
    const statusText = div.querySelector(".padlock-status");
    const defaultActions = div.querySelector(".default-actions");
    const editActions = div.querySelector(".edit-actions");

    // Seleciona os botões pelas classes definidas no padlock.html
    const btnUnlock = div.querySelector(".btn-unlock");
    const btnEdit = div.querySelector(".btn-edit");
    const btnSave = div.querySelector(".btn-save");
    const btnCancel = div.querySelector(".btn-cancel");

    // Lógica para pular inputs automaticamente ao digitar
    inputs.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
            if (e.target.value && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && !e.target.value && idx > 0) {
                inputs[idx - 1].focus();
            }
        });
    });

    const clearInputs = () => inputs.forEach(input => input.value = "");

    // 3. CORREÇÃO: Eventos aplicados diretamente nas variáveis dos botões
    btnUnlock.addEventListener("click", () => {
        div.classList.remove("error-shake");
        let inputPassword = Array.from(inputs).map(input => input.value).join("");

        if (padlock.unlock(inputPassword)) {
            document.activeElement.blur();
            div.classList.add("unlocked");
            statusText.textContent = `Cadeado ${index + 1} • Aberto`;
            clearInputs();
        } else {
            void div.offsetWidth;
            div.classList.add("error-shake");
            clearInputs();
            inputs[0].focus();
        }
    });

    btnEdit.addEventListener("click", () => {
        statusText.textContent = "Nova Senha";
        statusText.style.color = "#60a5fa";
        defaultActions.style.display = "none";
        editActions.style.display = "flex";
        clearInputs();
        inputs[0].focus();
    });

    btnCancel.addEventListener("click", () => {
        statusText.textContent = padlock.isLocked() ? `Cadeado ${index + 1}` : `Cadeado ${index + 1} • Aberto`;
        statusText.style.color = "";
        defaultActions.style.display = "flex";
        editActions.style.display = "none";
        clearInputs();
    });

    btnSave.addEventListener("click", () => {
        let newPassword = Array.from(inputs).map(input => input.value).join("");

        if (newPassword.length === 4 && !isNaN(newPassword)) {
            padlock.setPassword(newPassword);
            padlock.lock();

            div.classList.remove("unlocked");
            statusText.textContent = `Cadeado ${index + 1}`;
            statusText.style.color = "";
            defaultActions.style.display = "flex";
            editActions.style.display = "none";
            clearInputs();
        } else {
            void div.offsetWidth;
            div.classList.add("error-shake");
            inputs[0].focus();
        }
    });

    div.addEventListener("animationend", (e) => {
        if (e.animationName === "shake") {
            div.classList.remove("error-shake");
        }
    });
}