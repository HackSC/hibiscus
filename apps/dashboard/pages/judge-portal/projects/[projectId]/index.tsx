import { useState, useEffect } from "react";
import useHibiscusUser from "apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user";
import { useHibiscusSupabase } from "@hibiscus/hibiscus-supabase-context";
import { HibiscusRole } from '@hibiscus/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
