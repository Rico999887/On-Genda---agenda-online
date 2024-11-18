const supabaseUrl = 'https://qjlaepompiyeptcrgsjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbGFlcG9tcGl5ZXB0Y3Jnc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTE0MjEsImV4cCI6MjA0NzQ2NzQyMX0.2rQDDndKsn0RLGDD1meY5O1prgp8ovnU169b999BvlI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
