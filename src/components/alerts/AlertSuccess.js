import swal from "sweetalert";

export default function AlertSuccess(message) {
  return (
    swal({
      title: "Sucesso!",
      text: message,
      icon: "success",
      button: "OK",})
  );
}
