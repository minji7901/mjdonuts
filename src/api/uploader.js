export async function uploadImage(file) {
   // FormData 객체 생성
  const data = new FormData();

   // FormData에 파일과 업로드 프리셋 추가
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: data
  })
    .then(res => res.json())
    .then(data => data.url);
}