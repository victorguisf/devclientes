import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";


interface CustomerProps{
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

// Uso do hook useEffect para execução de efeitos colaterais
  useEffect(() => {
    // Função a ser executada quando o componente montar (componentDidMount)
    // ou quando as dependências passadas como segundo argumento mudarem
    // Neste caso, como o array de dependências está vazio ([]), a função será executada apenas uma vez, no momento em que o componente for montado
    // Se houver dependências, a função será executada novamente toda vez que uma das dependências mudar
    loadCustomers();
  }, []); // Array de dependências vazio indica que o efeito não depende de nenhuma variável e deve ser executado apenas uma vez

  async function loadCustomers (){
    const response = await api.get("/customers")
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    setCustomers(allCustomers =>[...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""

  } 

  async function handleDelete(id: string){
    try{
      await api.delete("/customer", {
        params:{
          id: id,
        }
      })

      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl"> {/* Quando passar da mínima "md:max-w-2xl" será aplicado essa responsividade */}
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input 
          type="text"
          placeholder="Digite seu nome completo..." 
          className="w-full mb-5 p-2 rounded"
          ref={nameRef}
          />
          <label className="font-medium text-white">Email:</label>
          <input 
          type="email"
          placeholder="Digite seu email..." 
          className="w-full mb-5 p-2 rounded"
          ref={emailRef}
          />
          <input 
          type="submit" 
          value="Cadastrar"
          className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
        </form>

        <section className="flex flex-col gap-4">

        {/* Mapeando a lista de clientes (customers) para renderizar cada cliente como um componente "article" */}
        {customers.map((customer) => (
          <article
            key={customer.id} // Chave única para cada componente na lista, ajuda o React a identificar elementos de forma eficiente
            className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" // Classes CSS para estilizar o componente "article"
          >
            {/* Exibindo o nome do cliente */}
            <p><span className="font-medium">Nome:</span> {customer.name}</p>
            {/* Exibindo o email do cliente */}
            <p><span className="font-medium">Email:</span> {customer.email}</p>
            {/* Exibindo o status do cliente, mostrando "ATIVO" se status for true, senão "INATIVO" */}
            <p><span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "INATIVO"}</p>

            {/* Botão de exclusão do cliente */}
            <button
              className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2" // Classes CSS para estilizar o botão de exclusão
              onClick={() => handleDelete(customer.id)}
            >
              {/* Ícone de lixeira */}
              <FiTrash size={18} color="#FFF" /> {/* Ícone de lixeira (react-icons) */}
            </button>
          </article>
        ))}

        </section>
      </main>
    </div>
  )
}