import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css"

const FormDashboard = ({ autenticated, setAutenticated }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userTec, setUserTec] = useState([]);
  const [user, setUser] = useState("");
  const [erro, setErro]=useState(false)

  useEffect(() => {
    if (autenticated) {
      setToken(JSON.parse(localStorage.getItem("@kenziehub:token")));
      setUser(JSON.parse(localStorage.getItem("@kenziehub.user")));
      setUserId(JSON.parse(localStorage.getItem("@kenziehub:userId")));
      getDataApi();
    }
  }, [autenticated]);

  const getDataApi = () => {
    api
      .get(`/users/${userId}`)
      .then((response) => {
        setUserTec([...response.data.techs]);
      })
      .catch((error) => console.log(error));
  };

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório").lowercase(),
    status: yup.string().required("Campo obrigatório").lowercase(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmit = (data) => {

    if (data) {
      api
        .post("/users/techs", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_) => {
          getDataApi();
          setErro(false)
        })
        .catch((_) => setErro(true));
    }
  };

  const handleDelete = (id) => {
    api
      .delete(`/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        setUserTec(userTec.filter((item) => item.id !== id));
        getDataApi();
      })
      .catch((error) => console.log(error));
  };

  if (!autenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Dados do usuário</h1>
      <div className="container_user">
        <p>Nome: {user.name}</p>
        <p>E-mail: {user.email}</p>
        <p>Biografia: {user.bio}</p>
        <p>Contato: {user.contact}</p>
      </div>
      <h4>Minhas Tecnologias</h4>
      <ol>
        {userTec.map((item, index) => {
          return (
            <>
              <li key={index}>
                Título: {item.title} Status: {item.status}
              <button className="btn_delete" onClick={() => handleDelete(item.id)}>Deletar</button>
              </li>
            </>
          );
        })}
      </ol>

      <form className="add_tecnology" onSubmit={handleSubmit(formSubmit)}>
        <div>
          <p>Adicionar Tecnologias</p>
          <input type="text" placeholder="Título" {...register("title")} />
          <p>{errors.title?.message}</p>
          {erro && <p>Tecnologia já cadastrada tente outra</p>}
          <select name="" {...register("status")}>
            <option defaultValue="Iniciante" value="Iniciante">
              Iniciante
            </option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <p>{errors.status?.message}</p>
          <button className="btn_addTecnology" type="submit">Adicionar</button>
          
        </div>
      </form>
    </>
  );
};
export default FormDashboard;
