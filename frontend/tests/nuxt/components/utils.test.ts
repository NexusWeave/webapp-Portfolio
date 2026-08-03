import { describe, it, expect } from 'vitest';

import Progress from '~/components/utils/Progress.vue';
import Announcement  from '~/components/utils/Announcements.vue';

describe('Tests for utility components', () => {
    it("Components should be defined", () => {
        const components = [Progress, Announcement];
        components.forEach((comp) => { expect(comp).toBeDefined();});
    })
});