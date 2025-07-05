export default function ListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 6 }).map((_, idx) => (
        <li key={idx}>
          <div>이미지</div>
          <div>닉네임</div>
          <div>받은 질문</div>
          <div>0개</div>
        </li>
      ))}
    </ul>
  );
}
