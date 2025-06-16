'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { projectId, dataset, apiVersion } from '~/sanity/env'
import { schema } from '~/sanity/schema/index'
import { structureTool } from 'sanity/structure'
import { structure } from '~/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'app-music',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
