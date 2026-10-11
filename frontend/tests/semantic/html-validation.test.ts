import { describe, it, expect, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { assertValidHtml } from './html-validator';

// Component imports
import ArticleBody from '~/components/article/Body.vue';
import ArticleHead from '~/components/article/Head.vue';
import ArticlePage from '~/components/article/Page.vue';
import DatesDate from '~/components/Dates/Date.vue';
import DatesYear from '~/components/Dates/Year.vue';
import FormDatalist from '~/components/form/datalist.vue';
import FormComponent from '~/components/form/Form.vue';
import FormInputs from '~/components/form/inputs.vue';
import FormLabel from '~/components/form/label.vue';
import FormOutput from '~/components/form/output.vue';
import FormSelection from '~/components/form/selection.vue';
import FormTextarea from '~/components/form/textarea.vue';
import LayoutFooter from '~/components/layout/Footer.vue';
import LayoutHeader from '~/components/layout/Header.vue';
import MediaFigure from '~/components/media/Figure.vue';
import MediaIcon from '~/components/media/Icon.vue';
import MediaComponent from '~/components/media/Media.vue';
import NavigationAnchor from '~/components/navigation/Anchor.vue';
import NavigationButton from '~/components/navigation/Button.vue';
import NavigationNavMenu from '~/components/navigation/NavMenu.vue';
import RepositoryBusinessCard from '~/components/repository/BusinessCard.vue';
import RepositoryPortfolio from '~/components/repository/Portfolio.vue';
import TimelineCard from '~/components/timeline/Card.vue';
import TimelineFilter from '~/components/timeline/Filter.vue';
import TimelineComponent from '~/components/timeline/Timeline.vue';
import UtilsAnnouncements from '~/components/utils/Announcements.vue';
import UtilsProgress from '~/components/utils/Progress.vue';

// Page imports
import IndexPage from '~/pages/index.vue';
import DevPage from '~/pages/dev.vue';
import PersonalPage from '~/pages/personal.vue';
import SecurityPolicyPage from '~/pages/security-policy.vue';
import EquipmentsInfoPage from '~/pages/equipments-info.vue';
import LogsIndexPage from '~/pages/logs/index.vue';

// Mock data
import { dummyPostItem, dummyHeaderData } from '~/tests/data/articleData';
import { dummyDatePublished, dummyYearString } from '~/tests/data/dateData';
import {
  dummyFormData,
  dummyInputsData,
  dummyDatalistData,
  dummyOutputData,
  dummySelectionData,
  dummyTextareaData
} from '~/tests/data/formData';
import { dummyButtonData, dummyAnchorData } from '~/tests/data/navigationData';
import { cardDummyData, portfolioDummyData } from '~/tests/data/repositoryData';
import { dummyTimelineCard, dummyTimelineFilter, dummyTimeline } from '~/tests/data/timelineData';
import { dummyReferences } from '~/tests/data/layoutData';

mockNuxtImport('fetchRepositories', () => vi.fn().mockResolvedValue({
  repo: { value: [] },
  refresh: () => {}
}));
mockNuxtImport('fetchCollection', () => vi.fn().mockResolvedValue({ value: [] }));

const commonStubs = {
  MDC: { props: ['value'], template: '<div><slot /></div>' },
  ContentRenderer: { props: ['value'], template: '<div><slot /></div>' },
  NuxtLink: { template: '<a><slot /></a>' }
};

describe('HTML Validation - Components', () => {
  const componentsToTest = [
    { name: 'ArticleBody', component: ArticleBody, props: { data: dummyPostItem } },
    { name: 'ArticleHead', component: ArticleHead, props: { isPost: false, article: dummyPostItem } },
    { name: 'ArticlePage', component: ArticlePage, props: { data: dummyPostItem } },
    { name: 'DatesDate', component: DatesDate, props: { data: dummyDatePublished } },
    { name: 'DatesYear', component: DatesYear, props: { data: dummyYearString, isVisible: true } },
    { name: 'FormDatalist', component: FormDatalist, props: { data: dummyDatalistData } },
    { name: 'FormComponent', component: FormComponent, props: { data: dummyFormData[0] } },
    { name: 'FormInputs', component: FormInputs, props: { data: dummyInputsData[0] } },
    { name: 'FormLabel', component: FormLabel, props: { data: { name: 'test', label: 'Test Label' } } },
    { name: 'FormOutput', component: FormOutput, props: { data: dummyOutputData } },
    { name: 'FormSelection', component: FormSelection, props: { data: dummySelectionData } },
    { name: 'FormTextarea', component: FormTextarea, props: { data: dummyTextareaData } },
    { name: 'LayoutFooter', component: LayoutFooter, props: {} },
    { name: 'LayoutHeader', component: LayoutHeader, props: {} },
    { name: 'MediaFigure', component: MediaFigure, props: { data: { src: '/test.png', alt: 'Test figure' } } },
    { name: 'MediaIcon', component: MediaIcon, props: { cls: 'bi-check', label: 'Check' } },
    {
      name: 'MediaComponent',
      component: MediaComponent,
      props: {
        data: {
          media: [
            { id: 1, type: 'image', description: 'Test media', anchor: dummyAnchorData, date: dummyDatePublished }
          ]
        },
        cls: ['media-wrapper', 'media-section', 'media-item']
      }
    },
    { name: 'NavigationAnchor', component: NavigationAnchor, props: { data: dummyAnchorData } },
    { name: 'NavigationButton', component: NavigationButton, props: { data: dummyButtonData[0] } },
    { name: 'NavigationNavMenu', component: NavigationNavMenu, props: { data: [dummyAnchorData] } },
    { name: 'RepositoryBusinessCard', component: RepositoryBusinessCard, props: { data: cardDummyData[0] } },
    { name: 'RepositoryPortfolio', component: RepositoryPortfolio, props: { data: portfolioDummyData } },
    { name: 'TimelineCard', component: TimelineCard, props: { data: dummyTimelineCard[0].data } },
    { name: 'TimelineFilter', component: TimelineFilter, props: dummyTimelineFilter[0] },
    { name: 'TimelineComponent', component: TimelineComponent, props: { data: dummyTimeline } },
    { name: 'UtilsAnnouncements', component: UtilsAnnouncements, props: {} },
    {
      name: 'UtilsProgress',
      component: UtilsProgress,
      props: { data: { label: 'TypeScript', bytes: 1000, type: 'bytes' } }
    }
  ];

  for (const { name, component, props } of componentsToTest) {
    it(`validates HTML for component: ${name}`, async () => {
      const wrapper = await mountSuspended(component, {
        props: props || {},
        global: { stubs: commonStubs }
      });
      await flushPromises();

      const html = wrapper.html();
      expect(html).toBeDefined();
      await assertValidHtml(html);
    });
  }
});

describe('HTML Validation - Pages', () => {
  const pagesToTest = [
    { name: 'IndexPage', component: IndexPage },
    { name: 'DevPage', component: DevPage },
    { name: 'PersonalPage', component: PersonalPage },
    { name: 'SecurityPolicyPage', component: SecurityPolicyPage },
    { name: 'EquipmentsInfoPage', component: EquipmentsInfoPage },
    { name: 'LogsIndexPage', component: LogsIndexPage }
  ];

  for (const { name, component } of pagesToTest) {
    it(`validates HTML for page: ${name}`, async () => {
      const wrapper = await mountSuspended(component, {
        global: { stubs: commonStubs }
      });
      await flushPromises();

      const html = wrapper.html();
      expect(html).toBeDefined();
      await assertValidHtml(html);
    });
  }
});
