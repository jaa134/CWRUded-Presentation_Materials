//
//  SettingsViewController.swift
//  CWRUded
//
//  Created by Jacob Alspaw on 3/19/19.
//  Copyright © 2019 Jacob Alspaw. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {
    
    @IBOutlet weak var titleView: UIView!
    @IBOutlet weak var titleIconLabel: UILabel!
    @IBOutlet weak var titleTextLabel: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    private var tableData: [Setting]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    private func setupView() {
        setTitle()
        updateTableData()
        setTableView()
    }
    
    private func setTitle() {
        setTitle(container: titleView,
                 iconLabel: titleIconLabel,
                 textLabel: titleTextLabel,
                 icon: Icons.cog,
                 title: " Settings")
    }
    
    private func setTableView() {
        tableView.backgroundColor = ColorPallete.clay
        tableView.allowsMultipleSelection = false
        
        self.tableView.dataSource = self
        self.tableView.delegate = self
    }
    
    private func updateTableData() {
        tableData = [Setting]()
        tableData.append(Setting(icon: Icons.refresh,
                                 iconColor: ColorPallete.lightBlue,
                                 name: "Refresh Rate",
                                 onClick: { self.openRefreshRateMenu() }))
        tableData.append(Setting(icon: Icons.heart,
                                 iconColor: ColorPallete.red,
                                 name: "Favorite Locations",
                                 onClick: { self.segueToFavorites() }))
        tableData.append(Setting(icon: Icons.ban,
                                 iconColor: ColorPallete.red,
                                 name: "Hidden Locations",
                                 onClick: { self.segueToBlacklist() }))
    }
    
    private func openRefreshRateMenu() {
        let rateActionSheet = UIAlertController(title: "Refresh Rate", message: "Select an option to choose how often the application will retrieve data. A higher interval will limit data usage.", preferredStyle: UIAlertController.Style.actionSheet)
        
        let secs5 = UIAlertAction(title: "5 seconds", style: UIAlertAction.Style.default) { (action) in AppSettings.singleton.updateRefreshRate(interval: 5) }
        let secs10 = UIAlertAction(title: "10 seconds", style: UIAlertAction.Style.default) { (action) in AppSettings.singleton.updateRefreshRate(interval: 10) }
        let secs30 = UIAlertAction(title: "30 seconds", style: UIAlertAction.Style.default) { (action) in AppSettings.singleton.updateRefreshRate(interval: 30) }
        let secs60 = UIAlertAction(title: "60 seconds", style: UIAlertAction.Style.default) { (action) in AppSettings.singleton.updateRefreshRate(interval: 60) }
        let cancelAction = UIAlertAction(title: "Cancel", style: UIAlertAction.Style.cancel)
        
        rateActionSheet.addAction(secs5)
        rateActionSheet.addAction(secs10)
        rateActionSheet.addAction(secs30)
        rateActionSheet.addAction(secs60)
        rateActionSheet.addAction(cancelAction)
        
        self.present(rateActionSheet, animated: true, completion: nil)
    }
    
    private func segueToFavorites() {
        performSegue(withIdentifier: "toFavoriteLocations", sender: nil)
    }
    
    private func segueToBlacklist() {
        performSegue(withIdentifier: "toBlacklistedLocations", sender: nil)
    }
}

extension SettingsViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.tableData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SettingCell", for: indexPath) as! SettingCell
        let setting = self.tableData![indexPath.item]
        cell.setupView(setting: setting)
        return cell
    }
}

extension SettingsViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return SettingCell.height
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let setting = self.tableData![indexPath.item]
        setting.onClick()
    }
}
