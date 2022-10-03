const getList = document.getElementsByTagName('li');
const getOl = document.getElementById('lista-tarefas');
let tasksDb = [];
let grayItem;

// Verifica se existe algum elemento coma cor cinza, e transforma em branco.
const verifyWhosGray = () => {
  for (let i = 0; i < getList.length; i += 1) {
    if (getList[i].style.backgroundColor === 'gray') {
      getList[i].style.backgroundColor = 'white';
    }
  }
};

// Remove o item selecionado
const removeSelectedItem = () => {
  const getRmvBtn = document.getElementById('remover-selecionado');
  getRmvBtn.addEventListener('click', () => {
    for (let i = 0; i < getList.length; i += 1) {
      console.log(getList[i]);
      if (getList[i].style.backgroundColor === 'gray') {
        getOl.removeChild(getList[i]);
      }
    }
  });
};

// Transforma em cinza o evento que for clicado.
const greyAtClick = () => {
  for (let i = 0; i < getList.length; i += 1) {
    getList[i].addEventListener('click', () => {
      verifyWhosGray();
      getList[i].style.backgroundColor = 'gray';
      removeSelectedItem();
    });
  }
};

const deleteCompletedTasks = () => {
  const getCompleted = document.getElementsByClassName('completed');
  const getDeleteBtn = document.getElementById('remover-finalizados');

  getDeleteBtn.addEventListener('click', () => {
    for (let i = 0; i < getCompleted.length; i += 1) {
      getOl.removeChild(getCompleted[i]);
    }
  });
};

//
const completedTask = (e) => {
  e.target.classList.toggle('completed');
  deleteCompletedTasks();
};

// Risca a tarefa concluida
const resolvedTask = () => {
  for (let i = 0; i < getList.length; i += 1) {
    getList[i].addEventListener('dblclick', completedTask);
  }
};

// Cria a tarefa e customiza.
const createTask = () => {
  const getBtn = document.getElementById('criar-tarefa');
  const getInput = document.getElementById('texto-tarefa');
  getBtn.addEventListener('click', () => {
    const createLi = document.createElement('li');
    createLi.innerHTML = getInput.value;
    getOl.appendChild(createLi);
    getInput.value = '';
    greyAtClick();
    resolvedTask();
  });
};

// Deleta todas as tarefas
const deleteTasks = () => {
  const getBtnDelete = document.getElementById('apaga-tudo');
  getBtnDelete.addEventListener('click', () => {
    while (getOl.firstChild) {
      getOl.removeChild(getOl.lastChild);
    }
  });
};

// Funcao para salvar tarefas
const saveTasks = () => {
  const getSaveBtn = document.getElementById('salvar-tarefas');
  getSaveBtn.addEventListener('click', () => {
    tasksDb = [];
    for (let i = 0; i < getList.length; i += 1) {
      const tasks = {
        text: getList[i].innerHTML,
        classe: getList[i].className,
      };

      tasksDb.push(tasks);
      console.log(tasks);
    }
    localStorage.setItem('tasks', JSON.stringify(tasksDb));
  });
};

// Renderizando as tarefas salvas
const renderSavedTasks = () => {
  const getSavedItems = JSON.parse(localStorage.getItem('tasks'));

  if (getSavedItems !== null) {
    for (let i = 0; i < getSavedItems.length; i += 1) {
      const createLi = document.createElement('li');
      createLi.innerHTML = getSavedItems[i].text;
      createLi.className = getSavedItems[i].classe;
      getOl.appendChild(createLi);
    }
    greyAtClick();
    resolvedTask();
    removeSelectedItem();
  }
};

//
const verifyFirstIsGray = (itemAcima, vizinho) => {
  const theArriba = vizinho;
  const theItem = itemAcima;

  [theArriba.innerText, theItem.innerText] = [
    theItem.innerText,
    theArriba.innerText,
  ];
  [theArriba.className, theItem.className] = [
    theItem.className,
    theArriba.className,
  ];
  [theArriba.style.backgroundColor, theItem.style.backgroundColor] = [
    theItem.style.backgroundColor,
    theArriba.style.backgroundColor,
  ];
};

const verifyColour = () => {
  for (let i = 0; i < getList.length; i += 1) {
    if (getList[i].style.backgroundColor === 'gray') {
      grayItem = getList[i];
    }
  }
};

// Mover elemento para cima
const moveUp = () => {
  const getMvUpBtn = document.getElementById('mover-cima');

  getMvUpBtn.addEventListener('click', () => {
    verifyColour();

    if (grayItem === undefined) {
      return null;
    }

    if (
      grayItem.style.backgroundColor === 'gray' && grayItem.previousElementSibling !== null
    ) {
      verifyFirstIsGray(grayItem, grayItem.previousElementSibling);
    }
  });
};

const moveDown = () => {
  const getMvUpBtn = document.getElementById('mover-baixo');

  getMvUpBtn.addEventListener('click', () => {
    verifyColour();

    if (grayItem === undefined) {
      return null;
    }

    if (
      grayItem.style.backgroundColor === 'gray' && grayItem.nextElementSibling !== null
    ) {
      verifyFirstIsGray(grayItem, grayItem.nextElementSibling);
    }
  });
};

renderSavedTasks();
createTask();
deleteTasks();
saveTasks();
moveUp();
moveDown();
