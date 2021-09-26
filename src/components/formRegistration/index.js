import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { Link, Redirect } from "react-router-dom";
import "./style.css"

const FormRegistration = ({ autenticated, setAutenticated }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo nome obrigatório"),
    email: yup.string().email("Email inválido").required("Campo email obrigatório"),
    password: yup
      .string()
      .required("Campo senha obrigatório")
      .min(8, "Mínimo de 8 caracteres"),
    contact: yup.string().required("Campo contato obrigatório"),
    bio: yup.string().required("Campo bio obrigatório"),
    course_module: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmit = (data) => {
    api
      .post("/users", data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  if (autenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container_registration">
      <form onSubmit={handleSubmit(formSubmit)}>
        <h1>Cadastrar</h1>
        <div>
          <input type="text" placeholder="Seu Nome" {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <input type="text" placeholder="Seu Email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Sua Senha"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <input
            type="number"
            placeholder="Seu Contato"
            {...register("contact")}
          />
          <p>{errors.contact?.message}</p>
        </div>
        <div>
          <input type="text" placeholder="Sua Biografia" {...register("bio")} />
          <p>{errors.bio?.message}</p>
        </div>
        <div>
          <select name="" {...register("course_module")}>
            <option defaultValue value="1º Módulo (Introdução ao Frontend)">
              1º Módulo (Introdução ao Frontend)
            </option>
            <option value="2º Módulo (Frontend Intermediário)">
              2º Módulo (Frontend Avançado)
            </option>
            <option value="3º Módulo (Introdução ao Backend)">
              3º Módulo (Introdução ao Backend)
            </option>
            <option value="4º Módulo (Backend Avançado)">
              4º Módulo (Backend Avançado)
            </option>
          </select>
          <p>{errors.course_module?.message}</p>
        </div>
        <button className="btn_registration" type="submit">Cadastrar</button>
        <div>
          <p>Já possui uma conta?</p>
          <Link to="/">Faça seu login</Link>
        </div>
      </form>
    </div>
  );
};
export default FormRegistration;
