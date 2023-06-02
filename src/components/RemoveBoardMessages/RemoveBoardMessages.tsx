export const DeleteBoardMessage = (color: string = '#ff105e') => {
  return (
    <>
      <span style={{ color: color, fontWeight: 'bold' }}>Delete</span> the
      board, titled
    </>
  );
};

export const UnsubscribeBoardMessage = (color: string = '#42c5e4') => {
  return (
    <>
      <span style={{ color: color, fontWeight: 'bold' }}>Unsubscribe</span> from
      the board
    </>
  );
};
