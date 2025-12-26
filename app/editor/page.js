import Editor from '@/components/Editor';
import dynamic from 'next/dynamic';
import Tabs from '@/components/Tabs';

// Dynamically import Preview with SSR disabled to fix usePDF web API issue
const Preview = dynamic(() => import('@/components/Resume/Preview'), {
    ssr: false,
    loading: () => (
        <div className="flex min-h-96 w-full items-center justify-center md:max-w-[24rem] 2xl:max-w-[28rem]">
            <div className="animate-spin text-4xl text-primary-400">⏳</div>
        </div>
    ),
});

// Dynamically import TemplateSelector
const TemplateSelector = dynamic(() => import('@/components/TemplateSelector'), {
    ssr: false,
});

const page = ({ searchParams: { tab = 'contact' } }) => {
    return (
        <div className="mx-auto mt-8 flex max-w-screen-xl 2xl:max-w-screen-2xl flex-col-reverse gap-10 px-3 pb-8 md:flex-row md:mt-8 2xl:mt-14 2xl:gap-16">
            <div className="md:sticky md:top-8 md:self-start">
                <Preview />
            </div>
            <div className="flex-grow">
                <TemplateSelector />
                <Tabs activeTab={tab} />
                <Editor tab={tab} />
            </div>
        </div>
    );
};

export default page;
