
async function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Erro ao fazer login: " + error.message);
  } else {
    alert("Login bem-sucedido!");
    window.location.href = 'todos.html';
  }
}