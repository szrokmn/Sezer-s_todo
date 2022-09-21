const form = document.querySelector(".todo_form");
const input = document.querySelector(".todo_input");

const startConf = () => {
    //baslangıc ayarları -- sayfaya yeni giren kullanıcı hiç todo oluşturmadıysa localStorage ine boş liste olarak kaydedeceğim
    const todos = localStorage.getItem("todos");    // localStorage deki todos u getItem ile aldık
    if(!todos) {                                    // eğer yapılacaklar listesinde hiçbir şey yoksa
        localStorage.setItem("todos", JSON.stringify([]));   // localStorage e setItem ile depola JSON formatında string olarak boş dizi --- [{}, {}] şeklinde
    }                                               // setItem içine string olarak alır
}

startConf();         // startConf fonksiyonunu sayfa açılırken aşağılara inmeden çalıştırıyorum 

const addTodo = (e) => {        // form submit olduğunda yenilenir --- bu durum default değerdir
    e.preventDefault();         // form un default davranışını e.preventDefault() diyerek önledik
    
    const todoText = input.value;     // inputtaki değeri todoText e atadık

    const todo = {              // todo objemizi oluşturduk
        text:todoText,          
        isCompleted:false,
    };

    const todos = JSON.parse(localStorage.getItem("todos"));        // todo larımı localstorage den almak istiyorum
    todos.push(todo);                                   // yeni oluşturduğum todo yu todos arrayine push yaptım
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(todos)                                  // şuan todos keyine ait bir değer olmadığı için null verdi consol da.


}

form.addEventListener("submit", addTodo);       // form submit olduğu zaman todo yu ekleyeceğiz  