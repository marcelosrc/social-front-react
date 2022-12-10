import React from "react";

const [contextMenuAnchorPoint, setContextMenuAnchorPoint] = React.useState({
  x: 0,
  y: 0,
});
const [showContextMenu, setShowContextMenu] = React.useState(false);
const [postId, setPostId] = React.useState("");

export const contextMenu = (postId) => (event) => {
  event.preventDefault();
  setPostId(postId);
  setContextMenuAnchorPoint({ x: event.pageX, y: event.pageY });
  setShowContextMenu(true);

  return (
    <>
      {showContextMenu && (
        <div
          className="context-menu fade-in"
          style={{
            top: contextMenuAnchorPoint.y,
            left: contextMenuAnchorPoint.x,
          }}
        >
          <small>Conteudo</small>
        </div>
      )}
    </>
  );
};
