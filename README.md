# My SNS

<br>

## 배포

- <a href="https://nextjs-13-blog-tada-js.vercel.app/" target="_blank">https://my-sns.vercel.app/</a>

<br><br>

## 개발 환경

- 개발 환경

  - Sanity
  - Next.js
  - TypeScript
  - React.js
  - Tailwind CSS
  - SWR

- 세부 개발 환경
  ```json
    "@sanity/client": "^6.1.3",
    "@sanity/image-url": "^1.0.2",
    "@types/node": "20.3.1",
    "@types/react": "18.2.12",
    "@types/react-dom": "18.2.5",
    "autoprefixer": "10.4.14",
    "eslint": "8.42.0",
    "eslint-config-next": "13.4.5",
    "next": "13.4.5",
    "next-auth": "^4.22.1",
    "postcss": "8.4.24",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.10.1",
    "react-multi-carousel": "^2.8.4",
    "react-spinners": "^0.13.8",
    "swr": "^2.1.5",
    "tailwindcss": "3.3.2",
    "timeago.js": "^4.0.2",
    "typescript": "5.1.3"
  ```

<br><br>

## 주요 기능

- 구글 계정으로 로그인 및 로그아웃
- 아이디 또는 이름으로 사용자 검색
- 디바운스를 통해 사용자 검색 API 요청을 최적화
- 이미지와 텍스트를 업로드할 수 있는 피드 작성
- 코멘트 작성
- 팔로우, 언팔로우 기능
- 좋아요, 북마크 기능
- SEO 최적화, 접근성 개선

<br><br>

## 세부 경험

- 크롬 Lighthouse 측정을 참고하여 SEO와 접근성을 개선하였습니다.
  - `Link` 태그에 `aria-label`를 추가하여 스크린 리더 사용자와 브라우저에 필요한 정보를 전달할 수 있도록 개선하였습니다.
  - SEO 최적화를 위해 Next.js 메타데이터 추가하였고, 동적 라우팅 된 사용자 페이지는 동적 메타 데이터가 필요하므로 `generateMetadata`를 통해 title과 description 명시하였습니다.
  - 그 결과로 SEO, Accessibility는 100점으로 측정되었습니다.
    ![Accessibility point](https://velog.velcdn.com/images/nu11/post/b3bcecd4-5601-4c80-92ec-0993556a991d/image.png)
    ![SEO point](https://velog.velcdn.com/images/nu11/post/00fb54dd-ccf1-4f0c-a31c-2f8f4583783e/image.png)
- 사용자 검색을 위해 입력값이 업데이트되는 즉시 API 요청을 하지 않고, 디바운스 커스텀 훅을 사용해 API 요청을 최적화하였습니다.

  ```ts
  const useDebounce = (value: string, delay: number = 500) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
  };
  ```

- Sanity의 오픈 소스 쿼리 언어인 GROQ를 사용하여 필요한 데이터를 요청합니다.
- Sanity 데이터 베이스에 사용자를 추가하고 사용자 정보를 저장합니다.
  - Sanity를 통해 데이터 저장하면 Content Lake 클라우드에 저장되며, Content Lake에 저장된 데이터는 개발자 모드(어드민) Sanity Studio를 통해 관리하거나 Sanity에서 제공하는 API를 사용하여 클라이언트에서 데이터를 읽거나 쓸 수 있습니다.
- Next-Auth의 OAuth를 사용하여, Google 계정으로 로그인, 로그아웃할 수 있습니다.
- 사용자가 좋아요, 북마크를 클릭했을 때 네트워크 통신이 끝나고 서버의 응답을 받아와야지만 좋아요, 북마크 버튼 UI가 업데이트되어 반응이 느려 보이는 문제점이 있었습니다. 이를 개선하기 위해 SWR의 Bound Mutate의 옵션으로 `optimisticData`를 사용해서 사용자가 클릭했을 때 즉각적으로 UI가 먼저 업데이트될 수 있도록 추가하였습니다.

<br><br>

## API 요청 플로우

- 클라이언트 컴포넌트 렌더링 → API 요청 → app/api 폴더에서 각각의 독립적인 route handler가 Next.js 서버에서 처리 → 사용자 검증 → src/service 폴더에 sanity 관련 api 모듈 함수를 호출 → 클라우드 Content Lake에서 필요한 데이터(정보)를 Next.js 서버에게 응답 → Next.js 서버에서 클라이언트로 응답
- 사용자 검증을 원하는 페이지와, api route handler는 미들웨어를 통해 처리합니다.
  (단, 로그인하지 않아도 이용 가능한 페이지는 제외하였습니다.)

<br><br>

## Sanity 데이터 스키마

- user
  - username
  - name
  - email
  - image
  - following → reference user, unique
  - followers → reference user, unique
  - bookmarks → reference post, unique
- post
  - author
  - photo
  - likes → reference user, unique
  - comments
    - comment fields
      - author → reference user
      - comment

<br><br>

## 폴더 구조

```
├─ studio
│  ├─ plugins
│  │  └─ sanity-plugin-tutorial
│  ├─ schemas
│  └─ static
└─ web
    └─ src
        ├ ─app
        │  ├─ api
        │  │  ├─ auth
        │  │  │  └─ [...nextauth]
        │  │  ├─ bookmarks
        │  │  ├─ comments
        │  │  ├─ follow
        │  │  ├─ likes
        │  │  ├─ me
        │  │  ├─ posts
        │  │  │  └─ [id]
        │  │  ├─ search
        │  │  │  └─ [keyword]
        │  │  └─ users
        │  │      └─ [...slug]
        │  ├─ auth
        │  │  └─ signin
        │  ├─ components
        │  │  └─ ui
        │  │      └─ icons
        │  ├─ new
        │  ├─ search
        │  └─ user
        │      └─ [username]
        ├─ context
        ├─ hooks
        ├─ model
        ├─ service
        ├─ types
        └─ util
```

- web → client 프로젝트 폴더

  - src

    - app
      - auth
        - signin
          - page.tsx → next-auth route 파일에서 정의한 커스텀 페이지
    - context → 재사용 가능한 context
    - hooks → 커스텀 훅
    - model → 공통적인 타입 정의
    - service → sanity 관련된 데이터 CRUD 로직(GROQ 쿼리)
    - types
      - next-auth.d.ts → session에 username 추가하기 위해 커스텀 타입 정의한 파일
    - util → 유틸 함수들 모음

- studio → sanity 프로젝트 폴더
  - schemas
    - index.ts → 정의한 스키마 사용
    - post.js → post에 대한 스키마 정의
    - user.js → user에 대한 스키마 정의
