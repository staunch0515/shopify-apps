import dynamic from "next/dynamic";
const Window = dynamic(import('../webapps/' + APP_NAME + '/common/window.js'));

export default (props) => {
  return <Window  {...props}></Window>
};
