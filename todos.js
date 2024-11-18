async function loadTodos() {
  const user = localStorage.getItem();


  if (!user) {
    alert("Você precisa estar logado para ver as tarefas.");
    return;
  }

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error(error);
    return;
  }

  const ul = document.getElementById('myUL');
  ul.innerHTML = ''; 

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;
    ul.appendChild(li);
  });
}

async function newElement() {
  const user = supabase.auth.user();
  if (!user) {
    alert("Você precisa estar logado para adicionar tarefas.");
    return;
  }

  const inputValue = document.getElementById('myInput').value;
  if (!inputValue) {
    alert("Digite um título para a tarefa!");
    return;
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title: inputValue, user_id: user.id }]);

  if (error) {
    console.error(error);
    alert("Erro ao adicionar tarefa.");
  } else {
    loadTodos(); 
  }
}

document.addEventListener('DOMContentLoaded', loadTodos);