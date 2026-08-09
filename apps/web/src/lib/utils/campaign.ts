export function getCampaignStats(campaign: any) {
    const totalEmails = campaign.emailRecords?.length || 0;
  
    const openedEmails =
      campaign.emailRecords?.filter(
        (email: any) => email.opened
      ).length || 0;
  
    const openRate =
      totalEmails === 0
        ? 0
        : Math.round((openedEmails / totalEmails) * 100);
  
    return {
      totalEmails,
      openedEmails,
      openRate,
      totalLeads: campaign.campaignLeads?.length || 0,
    };
  }