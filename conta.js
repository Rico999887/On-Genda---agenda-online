async function createAccount() {
  localStorage.setItem("username", username );
  localStorage.setItem("password", password);
  localStorage.setItem("email", email);


  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Erro ao criar conta: " + error.message);
  } else {
    alert("Conta criada com sucesso!");
    window.location.href = 'login.html';
  }
}