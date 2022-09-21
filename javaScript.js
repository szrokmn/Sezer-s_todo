const form = document.querySelector(".todo_form");
const input = document.querySelector(".todo_input");
const todo_container = document.querySelector(".todo_container");
let deleteBtns;
let checkboxes;
let editBtns;

const addHTML = (todo) => {

    const todoDiv = document.createElement("div");          // div oluşturduk
    todoDiv.classList.add("todo");                          // oluşturduğumuz div e class olarak "todo" verdik

    const todoLeft = document.createElement("div");         // div oluşturduk
    todoLeft.classList.add("todo_left");                     // todo_left isminde class ı var

    const todoCb = document.createElement("input");         // input oluşturduk
    todoCb.type = "checkbox";                               // type ına checkbox verdik
    todoCb.checked = todo.isCompleted;
    todoCb.classList.add("todo_cb");                       // class ına todo_cb verdik

    const todoText = document.createElement("span");        
    todoText.classList.add("todo_text");                               
    todoText.textContent = todo.text;        
    
    
    todoLeft.appendChild(todoCb);                           // todoCb yi todoLeft in içine attık
    todoLeft.appendChild(todoText);                         // todoText i todoLeft in içine attık  


    const todoRight = document.createElement("div");         
    todoRight.classList.add("todo_right");                    

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo_delete");
    deleteBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo_edit");
    editBtn.textContent = "Edit";


    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todo_container.appendChild(todoDiv);
}

const startConf = () => {
    //baslangıc ayarları -- sayfaya yeni giren kullanıcı hiç todo oluşturmadıysa localStorage ine boş liste olarak kaydedeceğim
    const todos = JSON.parse(localStorage.getItem("todos"));    // localStorage deki todos u getItem ile aldık  --- "JSON.parse" array metoduna çevirmek demektir
    if(!todos) {                                    // eğer yapılacaklar listesinde hiçbir şey yoksa
        localStorage.setItem("todos", JSON.stringify([]));   // localStorage e setItem ile depola JSON formatında string olarak boş dizi --- [{}, {}] şeklinde
    }else{
        todos.forEach(todo => {             // herbir todo için
            addHTML(todo);                  // html ye kaydet
        });
        deleteBtns = document.querySelectorAll(".todo_delete");
        checkboxes = document.querySelectorAll(".todo_cb");
        editBtns = document.querySelectorAll(".todo_edit");
    }                                               // setItem içine string olarak alır
}

startConf();         // startConf fonksiyonunu sayfa açılırken aşağılara inmeden çalıştırıyorum 

const addTodo = (e) => {        // form submit olduğunda yenilenir --- bu durum default değerdir
    e.preventDefault();         // form un default davranışını e.preventDefault() diyerek önledik
    
    const inputVal = input.value;     // inputtaki değeri todoText e atadık

    const todo = {              // todo objemizi oluşturduk
        text:inputVal,          
        isCompleted:false,
    };

    const todos = JSON.parse(localStorage.getItem("todos"));        // todo larımı localstorage den almak istiyorum
    todos.push(todo);                                   // yeni oluşturduğum todo yu todos arrayine push yaptım
    localStorage.setItem("todos", JSON.stringify(todos))
    // console.log(todos)                                  // şuan todos keyine ait bir değer olmadığı için null verdi consol da.

    addHTML(todo);      // todo yu burda oluşturduk
    form.reset();       // formu sıfırladık
}    

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(td => {
        if(td.text === text) td.isCompleted = !td.isCompleted
    });
        
    localStorage.setItem("todos", JSON.stringify(todos));  
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();

    input.value = text;
}





form.addEventListener("submit", addTodo);       // form submit olduğu zaman todo yu ekleyeceğiz  
deleteBtns.forEach(btn => btn.addEventListener("click", deleteTodo));
checkboxes.forEach(btn => btn.addEventListener("click", completeTodo));
editBtns.forEach(btn => btn.addEventListener("click", editTodo));