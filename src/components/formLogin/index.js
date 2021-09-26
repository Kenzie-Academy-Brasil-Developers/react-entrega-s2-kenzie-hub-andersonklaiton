import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import api from "../../services/api";
import "./style.css"

const FormLogin = ({ autenticated, setAutenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo email obrigatório"),
    password: yup
      .string()
      .required("Campo senha obrigatório")
      .min(8, "Mínimo de 8 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmit = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        localStorage.setItem(
          "@kenziehub:token",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "@kenziehub:userId",
          JSON.stringify(response.data.user.id)
        );
        localStorage.setItem(
          "@kenziehub.user",
          JSON.stringify(response.data.user)
        );
        return setAutenticated(true);
      })
      .catch((error) => console.log(error));
  };

  if (autenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container_login">
      <form onSubmit={handleSubmit(formSubmit)}>
        <h1>Login</h1>
        <div>
          <input type="text" placeholder="Seu email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Sua senha"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button className="btn_login" type="submit">Login</button>
        <div>
          <p>Ainda não possui uma conta?</p>
          <Link to="/registration">Registrar-se</Link>
        </div>
      </form>
    </div>
  );
};
export default FormLogin;
