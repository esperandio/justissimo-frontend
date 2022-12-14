import swal from "sweetalert";

export default function AlertError(message) {
  return (
    swal({
      title: "Erro!",
      text: message,
      icon: "error",
      button: "OK",})
  );
}