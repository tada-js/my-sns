import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// 요청의 모든 캐싱을 비활성화 하고 항사 재검증해서 동적 렌더링 및 동적 데이터 가져오기를 함.
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export async function GET() {
  // fetch를 통해 cache를 하지 않는 이상, 아래 같은 정적인 코드는 무조건 ssg로 동작
  return searchUsers().then((data) => NextResponse.json(data));
}
