import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigationService extends NavigationMixin(LightningElement) {

    handleNavigation(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account',
                actionName : 'home'
            }
        })
    }
    navigateToViewCasePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '500gL00000qK3qPQAS',
                objectApiName: 'Case',
                actionName: 'view'
            },
        });
    }
     navigateToMyCustomApplication() {
        this[NavigationMixin.Navigate]({
            type: 'standard__app',
            attributes: {
                appTarget: 'c__FirstCustomApp',
            }
        });
    }
    navigateToApexHoursPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://www.apexhours.com/'
            }
        });
    }
    navigateToCustomTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'QuizApp'
            },
        });
    }
    navigateToCaseListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            },
        });
    }
     navigateToContactRelatedList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: '001gL00000mhwuzQAA',
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
            },
        });
    }
    navToFilesPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ContentDocument',
                actionName: 'home'
            },
        });
    }
    navigateToCustomTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'CustomTabName'
            },
        });
    }
    navigateToVisualForcePage() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/CaseVFExample?id=' + this.recordId
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });
    }
    openCustomLightningComponent(){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__lwcPractice'
            }
        });
    }

}