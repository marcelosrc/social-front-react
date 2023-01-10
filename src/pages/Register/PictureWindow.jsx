import React from "react";

export default function PictureWindow(props) {
  const handleFileChange = (event) => {
    props.setNewUser({
      ...props.newUser,
      [event.target.name]: event.target.files[0],
    });
  };

  const Canvas = () => {
    const canvasRef = React.useRef(null);
    const draw = (ctx) => {
      ctx.rect(20, 20, 160, 160);
      ctx.stroke();
      ctx.strokeStyle = "#202529";
    };
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const render = () => {
        draw(context);
        window.requestAnimationFrame(render);
      };
      render();
    });
    return (
      <canvas className="canvas" width="200" height="200" ref={canvasRef} />
    );
  };

  const showPictureWindow = () => {
    props.setPictureWindow(false);
  };

  console.log(props.newUser.profilePic);

  return (
    <div className="registerpage-picture-page">
      <div className="registerpage-picture-window">
        <button className="standard-button" onClick={showPictureWindow}>
          Fechar
        </button>
        <Canvas />
        <label className="standard-button" htmlFor="profilePic">
          Carregar Foto
        </label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
