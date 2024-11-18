const supabaseUrl = 'https://qjlaepompiyeptcrgsjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbGFlcG9tcGl5ZXB0Y3Jnc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTE0MjEsImV4cCI6MjA0NzQ2NzQyMX0.2rQDDndKsn0RLGDD1meY5O1prgp8ovnU169b999BvlI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadTodos() {
  const user = supabase.auth.user();

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
  ul.innerHTML = '';  // Limpa a lista

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
    loadTodos();  // Recarregar a lista
  }
}

document.addEventListener('DOMContentLoaded', loadTodos);
