import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)

const displayErrors = (field, errors) => {
  let modField = ucFirst(field.replace("_", " "));
  return (
    <small>
      {errors[field]?.type === "required" ? `${modField} is required` : null}
      {errors[field]?.type === "pattern"
        ? `${modField} is in invalid format`
        : null}
      {errors[field]?.type === "minLength"
        ? `${modField} must meet the minimum length`
        : null}
      {errors[field]?.type === "maxLength"
        ? `${modField} is exceeding character limit`
        : null}
      {errors[field]?.type === "max"
        ? `${modField} is exceeding maximum number input`
        : null}
      {errors[field]?.type === "min"
        ? `${modField} is falling short of number input`
        : null}
    </small>
  );
};

const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const sweetAlertBox = (title = null, textMsg = null, icon = null) => {
  return MySwal.fire({
    title: title !== null ? title : 'Success',
    text: textMsg !== null ? textMsg : 'Changes Done.',
    icon: icon !== null ? icon : 'Success',
    customClass: {
      confirmButton: `btn btn-${icon !== null ? icon : "success"}`
    }
  });
}

export { displayErrors, sweetAlertBox };
