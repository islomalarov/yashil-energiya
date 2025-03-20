import { FormData } from "../FormComponent/TheForm";

export const EmailTemplate = ({ firstName, phone, message }: FormData) => {
  return (
    <div>
      <h1>Yelp recent login</h1>

      <p>
        <b>F.I.O: </b>
        {firstName}
      </p>
      <p>
        <b>Telefon: </b>
        {phone}
      </p>
      <p>
        <b>Murojat: </b>
        {message}
      </p>
    </div>
  );
};

export default EmailTemplate;
